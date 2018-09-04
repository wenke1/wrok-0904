var gulp = require("gulp");
var sass = require("gulp-sass");
var minCss = require("gulp-clean-css");
var minJS = require("gulp-uglify");
var server = require("gulp-webserver");

var fs = require("fs");
var path = require("path");
var url = require("url");

var data = require("./src/json/data");

gulp.task("sass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("./src/css"));
});

gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sass"));
})


gulp.task("devServer", function() {
    return gulp.src("src")
        .pipe(server({
            port: 8989,
            middleware: function(req, res) {
                if (req.url == "/favicon.ico") {
                    return res.end();
                }
                var pathname = url.parse(req.url).pathname;

                if (pathname == "/api/data") {
                    res.end(JSON.stringify({ code: 1, mes: data }));
                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                }
            }
        }))
})

gulp.task("dev", gulp.series("sass", "devServer", "watch"));