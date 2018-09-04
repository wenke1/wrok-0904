var gulp = require("gulp");
var sass = require("gulp-sass");
var minCss = require("gulp-clean-css");
var server = require('gulp-webserver');
var uglify = require('gulp-uglify');
var listJson = require('./mork/list.json');
var path = require('path');
var fs = require('fs');
var url = require('url');
gulp.task('minJs', function() {
    return gulp.src('./src/common/*.js')
        .pipe(uglify())
})
gulp.task("sass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("./src/css"));
});
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})
gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: '9090',
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                } else if (pathname === '/list') {
                    res.end(JSON.stringify(listJson));
                } else if (pathname === '/') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')))
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task('dev', gulp.series('sass', 'minJs', 'devServer', 'watch'))