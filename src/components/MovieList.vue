<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item
        v-for="movie in filteredMovies"
        v-bind:movie="movie.movie"
        v-bind:sessions="movie.sessions"
        v-bind:day="day"
        v-bind:time="time"
      ></movie-item>
    </div>
    <div v-else-if="movies.length" class="no-result">
      {{ noResult }}
    </div>
    <div v-else class="no-result">Loading...</div>
  </div>
</template>

<script>
import genres from "../util/genres";
import times from "../util/times";
import MovieItem from "./MovieItem.vue";
export default {
  props: ["genre", "time", "movies", "day"],
  data() {
    return {
      times,
    };
  },
  components: {
    MovieItem,
  },
  methods: {
    moviePassesGenreFilter(movie) {
      if (!this.genre.length) {
        return true;
      } else {
        let movieGenres = movie.movie.Genre.split(", ");
        let matched = true;
        this.genre.forEach((genre) => {
          if (movieGenres.indexOf(genre) == -1) {
            matched = false;
          }
        });
        return matched;
        //return this.genre.find((genre) => movie.genre === genre);
      }
    },
    sessionPassesTimeFilter(session) {
      if (!this.day.isSame(this.$moment(session.time), "day")) {
        return false;
      } else if (this.time.length === 0 || this.time.length === 2) {
        return true;
      } else if (this.time[0] === this.times.AFTER_6PM) {
        return this.$moment(session.time).hour() >= 18;
      } else {
        return this.$moment(session.time).hour() < 18;
      }
    },
  },
  computed: {
    noResult(){
      let times = this.time.join(', ')
      let genre = this.genre.join(', ')
      return `No results for ${times}${times.length && genre.length ? ', ':''}${genre}.`
    },
    filteredMovies() {
      return this.movies
        .filter(this.moviePassesGenreFilter)
        .filter((movie) => movie.sessions.find(this.sessionPassesTimeFilter));
    },
  },
};
</script>