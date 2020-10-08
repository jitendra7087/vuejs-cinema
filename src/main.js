import Vue from 'vue'
import './style.scss';
import VueResource from 'vue-resource'
import moment from 'moment-timezone'
import VueRouter from 'vue-router'

Vue.use(VueResource)
Vue.use(VueRouter)
import routes from './util/routes';
const router = new VueRouter({ routes })

moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

import { checkFilter, setDay } from './util/bus'
const bus = new Vue()
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } })

import Tooltip from './util/tooltip'
Vue.use(Tooltip)

new Vue({
    el: '#app',
    router,
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    created() {
        this.$http.get('api').then(response => {
            this.movies = response.data;
        });
        this.$bus.$on('check-filter', checkFilter.bind(this))
        this.$bus.$on('set-day', setDay.bind(this))
    }
});