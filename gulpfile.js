var gulp = require("gulp");
var sass = require("gulp-sass");
var minCss = require("gulp-clean-css");

gulp.task("sass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("./src/css"));
});
gulp.task('watch', function() {
    return gulp.watch('./src/scss/style.scss', gulp.series('sass'));
})