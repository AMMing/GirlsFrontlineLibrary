"use strict";
/// <reference path="../typings/tsd.d.ts" />
var gulp = require("gulp");
var clean = require("gulp-clean");
var less = require("gulp-less");
var ts = require("gulp-typescript");
var stylus = require("gulp-stylus");
var config = {
    dir: {
        clean: "**/*",
        src: __dirname + "/src",
        out: __dirname + "/build",
        web_css: "public/css",
        web_js: "public/js",
        map: null,
    },
    file: {
        ts: "**/*.{ts,tsx}",
        less: "**/*.less",
        stylus: "**/*.styl",
        bulid: "**/*.{ts,tsx,less,styl}",
        other: null,
    },
    min_suffix: ".min",
    map: {
        // includeContent: false,
        loadMaps: true
    }
};
var to_src = function (src) {
    return (config.dir.src + "/" + src);
};
var to_dest = function (src) {
    return (config.dir.out + "/" + src);
};
config.dir.map = to_dest("maps");
config.file.other = [
    to_src("**/*"),
    ("!" + to_src(config.file.bulid))
];
//清理编译之后的文件
gulp.task("clean", function () {
    return gulp.src(config.dir.out, { read: false })
        .pipe(clean());
});
//编译less
gulp.task("build:less", ["clean"], function () {
    return gulp.src(to_src(config.file.less))
        .pipe(less())
        .pipe(gulp.dest(to_dest("")));
});
//编译ts
gulp.task("build:ts", ["clean"], function () {
    return gulp.src(to_src(config.file.ts))
        .pipe(ts({
        jsx: "react"
    }))
        .pipe(gulp.dest(to_dest("")));
});
//编译stylus
gulp.task("build:stylus", ["clean"], function () {
    return gulp.src(to_src(config.file.stylus))
        .pipe(stylus())
        .pipe(gulp.dest(to_dest("")));
});
//编译less和ts
gulp.task("build", [
    "build:less",
    "build:ts",
    "build:stylus"
]);
//复制其他文件
gulp.task("copy", ["clean"], function () {
    return gulp.src(config.file.other)
        .pipe(gulp.dest(to_dest("")));
});
//执行全部任务
gulp.task("all-task", [
    "clean",
    "build",
    "copy"
]);
