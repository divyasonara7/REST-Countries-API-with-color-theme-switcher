import { createWebHistory, createRouter } from 'vue-router';
import CountryList from '@/components/CountryList.vue';
import CountryDetail from  '@/components/CountryDetail.vue';


const routes = [
	{
		path: '/',
		name: 'dashboard',
		component: CountryList,
	},
    {
		path: '/:id',
		name: 'country-detail',
		component: CountryDetail,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;