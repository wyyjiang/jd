const gulp = require("gulp");
const sass = require("gulp-sass");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");



gulp.task("sass", done => {
    gulp.src("sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compact'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"))
        .pipe(connect.reload());

    done();
});

gulp.task("server", done => {
    connect.server({
        root: "",
        livereload: true
    })
    done();
});

gulp.task("build", gulp.series("sass"));

gulp.task("watch", done => {
    gulp.watch("sass/*.scss", gulp.series("sass"));

    done();
});

gulp.task("default", gulp.series("build", "server", "watch"));