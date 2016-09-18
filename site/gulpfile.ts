/// <reference path="../typings/tsd.d.ts" />
import * as gulp from "gulp"
import * as clean from "gulp-clean"
import * as concat from "gulp-concat"
import * as cssmin from "gulp-cssmin"
import * as uglify from "gulp-uglify"
import * as less from "gulp-less"
import * as rename from "gulp-rename"
import * as ts from "gulp-typescript"
import * as sourcemaps from "gulp-sourcemaps"
import * as stylus from "gulp-stylus"

let config = {
    dir: {
        clean: "**/*",
        src: `${__dirname}/src`,
        out: `${__dirname}/build`,
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
}

let to_src: (src: string) => string = (src) =>
    `${config.dir.src}/${src}`;

let to_dest: (src: string) => string = (src) =>
    `${config.dir.out}/${src}`;

config.dir.map = to_dest("maps");
config.file.other = [
    to_src("**/*"),
    `!${to_src(config.file.bulid)}`
];

//清理编译之后的文件
gulp.task("clean", () =>
    gulp.src(config.dir.out, { read: false })
        .pipe(clean())
);

//编译less
gulp.task("build:less", ["clean"], () =>
    gulp.src(to_src(config.file.less))
        // .pipe(sourcemaps.init())
        .pipe(less())
        // .pipe(sourcemaps.write(config.dir.map, config.map))
        .pipe(gulp.dest(to_dest("")))
);

//编译ts
gulp.task("build:ts", ["clean"], () =>
    gulp.src(to_src(config.file.ts))
        // .pipe(sourcemaps.init())
        .pipe(ts({
            jsx: "react"
        }))
        // .pipe(sourcemaps.write(config.dir.map, config.map))
        .pipe(gulp.dest(to_dest("")))
);
//编译stylus
gulp.task("build:stylus", ["clean"], () =>
    gulp.src(to_src(config.file.stylus))
        // .pipe(sourcemaps.init())
        .pipe(stylus())
        // .pipe(sourcemaps.write(config.dir.map, config.map))
        .pipe(gulp.dest(to_dest("")))
);

//编译less和ts
gulp.task("build", [
    "build:less",
    "build:ts",
    "build:stylus"
]);

//复制其他文件
gulp.task("copy", ["clean"], () =>
    gulp.src(config.file.other)
        .pipe(gulp.dest(to_dest("")))
);

//执行全部任务
gulp.task("all-task", [
    "clean",
    "build",
    "copy"
]);