<template>
    <TopNavigationView />
    <div class="statistics">
        <div class="year">
            {{ year }}
        </div>
        <div class="this-year">
            <div class="this-year-title">
                올해 얼만큼 읽었는지 살펴볼까요?📚
            </div>
            <div class="this-year-info">
                <div class="this-year-info-item">
                    <div class="this-year-info-tag">1년 동안</div>
                    <div class="this-year-info-context">{{ statistics.totalReadCount }}</div>
                    <div class="this-year-info-tag">권 읽었어요</div>
                </div>
                <div class="this-year-info-item">
                    <div class="this-year-info-tag">책을 쌓으면</div>
                    <div class="this-year-info-context">{{ statistics.bookHeight }}</div>
                    <div class="this-year-info-tag">cm 쌓여요</div>
                </div>
                <div class="this-year-info-item">
                    <div class="this-year-info-tag">월 평균</div>
                    <div class="this-year-info-context">{{ statistics.monthly.averageReadMonth }}</div>
                    <div class="this-year-info-tag">권 읽었어요</div>
                </div>
                <div class="this-year-info-item">
                    <div class="this-year-info-tag">가장 많이 읽은 달</div>
                    <div class="this-year-info-context">{{ statistics.monthly.mostReadMonth.month }}</div>
                    <div class="this-year-info-tag">월이에요🌙</div>
                </div>
            </div>
        </div>
        <div class="monthly">
            <div class="monthly-tag">달마다 몇 권 읽었는지 살펴볼까요?</div>
            <Bar v-if="!isLoading" :data="monthlyBarChartData" />
        </div>
        <div class="star">
            <div class="star-tag">올해 쓴 내 리뷰의 평균✨</div>
            <div class="star-content">
                <div class="star-avg">
                    <span class="star-avg-content">{{ statistics.star.average }}</span>
                    <span class="star-avg-tag"> / 5점</span>
                </div>
                <Bar v-if="!isLoading" :data="starBarChartData" :options="starBarChartOptions" :style="starBarChartStyle"/>
            </div>
        </div>
        <div class="category">
            <div class="category-title">많이 읽은 카테고리 Top 10📌</div>
            <div class="most-category">
                <span class="most-category-content">{{ statistics.categories.ratios[0].categoryName }}</span>
                <span class="most-category-tag">를 가장 관심있어 해요!</span>
            </div>
            <div class="category-book">
                <span class="category-book-tag">카테고리별 독서량</span>
                <Bar v-if="!isLoading" :data="categoryChartData"/>
            </div>
            <div class="category-ratio">
                <span class="category-ratio-tag">카테고리별 비율</span>
                <Doughnut v-if="!isLoading" :data="categoryDoughnutData"/>
            </div>
        </div>
    </div>
    <BottomNavigationView />
</template>

<script>
import axios from 'axios';
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, Colors } from 'chart.js'
import TopNavigationView from '../navigation/TopNavigationView.vue';
import BottomNavigationView from '../navigation/BottomNavigationView.vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, Colors)


export default {
    components: {
        Bar,
        Doughnut,
        TopNavigationView,
        BottomNavigationView
    },
    beforeMount() {
        axios.get(process.env.VUE_APP_DOTORI_API_URL + '/statistics/year', {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            },
            params: {
                year: this.year
            }
        }).then((response) => {
            const { data } = response.data;
            this.statistics = data;

            const { monthly, star, categories } = this.statistics;
            this.monthlyBarChartData = {
                labels: monthly.monthlyCounts.map(mc => mc.month + '월'),
                datasets: [
                    {
                        label: '월별 독서량(권)',
                        data: monthly.monthlyCounts.map(mc => mc.count),
                    }
                ]
            }

            this.starBarChartData = {
                labels: star.ratios.map(r => r.star + '점'),
                datasets: [
                    {
                        label: '별점 비율(%)',
                        data: star.ratios.map(r => r.percentage),
                    }
                ]
            }
            this.starBarChartOptions = {
                indexAxis: 'y'            
            }


            this.categoryChartData = {
                labels: categories.ratios.map(r => r.categoryName),
                datasets: [
                    {
                        label: '카테고리별 독서량(권)',
                        data: categories.ratios.map(r => r.count),
                    }
                ]
            }
            this.categoryDoughnutData = {
                labels: categories.ratios.map(r => r.categoryName),
                datasets: [
                    {
                        data: categories.ratios.map(r => r.percentage),
                    }
                ]
            }

            this.isLoading = false;
        }).catch((error) => {
            console.error(error);
        });
    },
    data() {
        return {
            statistics: {
                monthly: {
                    mostReadMonth: {}
                },
                star: {},
                categories: {
                    ratios: [
                        { categoryName: '' }
                    ]
                }
            },
            monthlyBarChartData: {},
            starBarChartData: {},
            starBarChartOptions: {},
            starBarChartStyle: {
                width: '80%',
                height: '80%'
            },
            categoryChartData: {},
            categoryDoughnutData: {},
            year: new Date().getFullYear(),
            isLoading: true
        }
    }
}
</script>

<style scoped>
.statistics {
    padding-top: 50px;
    padding-bottom: 60px;
    font-family: 'SokchoBadaBatang', sans-serif;
    width: 396px;
}

.year {
    color: #F28379;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
}

.this-year {
    margin-bottom: 20px;
}

.this-year-title {
    color: #333;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
}

.this-year-info {
    display: flex;
    overflow-x: auto; 
    padding: 0;
    list-style: none; 
}

.this-year-info::-webkit-scrollbar{
  display:none;
}

.this-year-info-item {
    display: inline-block;
}

.this-year-info-tag {
    color: #555;
    font-size: 16px;
}

.this-year-info-context {
    color: #00B992;
    font-size: 25px;
    font-weight: bolder;
}

.this-year-info-tag, .this-year-info-context {
    width: 130px;
}

.monthly {
    margin-bottom: 20px;
}   

.monthly-tag {
    color: #444;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
}

.star {
    margin-bottom: 20px;
}

.star-tag {
    color: #333;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
}

.star-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.star-avg {
    width: 20%;
}

.star-avg-content {
    font-weight: bolder;
    font-size: 25px;
    color: #00B992;
}

.star-avg-tag {
    font-size: 16px;
    color: #555;
}

.category-title {
    color: #333;
    font-size: 16px;
    font-weight: bolder;
    margin-bottom: 15px;
}

.most-category {
    margin-bottom: 25px;
}

.most-category-content {
    font-size: 25px;
    font-weight: bolder;
    color: #00B992;
}

.most-category-tag {
    font-size: 16px;
    color: #555;
}

.category-book-tag {
    font-size: 16px;
    color: #555;
    font-weight: bold;
    margin-bottom: 15px;
}

.category-ratio {
    margin-top: 20px;
    margin-bottom: 15px;
}

.category-ratio-tag {
    font-size: 16px;
    color: #555;
    font-weight: bolder;
    margin-bottom: 15px;
}
</style>