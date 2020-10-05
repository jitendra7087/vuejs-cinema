<template>
    <div id="overview">
        <div id="main">
            <table width="100%">
                <tr>
                    <td width="70%" valign="top">
                        <movie-list v-bind:genre="genre" v-bind:time="time" v-bind:movies="movies" v-bind:day="day"></movie-list>
                    </td>
                    <td width="30%" valign="top">
                        <movie-filter></movie-filter>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import MovieList from './MovieList.vue'
import MovieFilter from './MovieFilter.vue'
export default {
    props: ["genre", "time", "movies", "day"],
    components: {
        MovieList,
        MovieFilter
    },
}
</script>