var gulp = require('gulp')
var server = require('gulp-webserver')
var path = require('path')
var fs = require('fs')
var url = require('url')
    // var data = require('')
var sass = require('gulp-sass')
gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 8888,
            middleware: function(req, res) {
                if (req.url === '/favicon.ico') {
                    res.end('')
                    return
                }
                var pathname = url.parse(req.url).pathname
                if (pathname === '/api/list') {
                    return res.end('成功')
                }
                pathname = pathname === '/' ? 'index.html' : pathname
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }))
})
gulp.task('sass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('dev', gulp.series(['sass', 'server']))