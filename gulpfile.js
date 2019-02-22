// 引入 gulp
let gulp = require('gulp');
// 引入组件
let jshint = require('gulp-jshint');
// var concat = require('gulp-concat');
let uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
let cleanCss = require('gulp-clean-css');
let htmlmin = require('gulp-htmlmin');
let sequence = require('run-sequence');
let fileInclude = require('gulp-file-include');
let babel = require('gulp-babel');
let del = require('del');
let browserSync = require('browser-sync').create();
// 定义变量
let destPath = './dist';
let bowerPath = './bower_components';
let nodePath = './node_modules';

// 检查js文件
gulp.task('lint', function() {
    return gulp.src(['./src/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// 页面使用的css文件
gulp.task('css', function() {
    return gulp.src(['./src/**/css/*.css', '!' + bowerPath + '/**/*'])
        .pipe(cleanCss())
        .pipe(gulp.dest(destPath));
});
// 页面使用的js文件
gulp.task('scripts', function() {
    return gulp.src(['./src/**/*.js', '!' + bowerPath + '/**/*'])
        .pipe(babel({
            presets: ['env']
        }))
        // .pipe(uglify())
        .pipe(gulp.dest(destPath));
});
// 工具类js文件
gulp.task('utils', function() {
    return gulp.src(['./src/util/*.js'])
        .pipe(babel({
            presets: ['env']
        }))
        // .pipe(uglify())
        .pipe(gulp.dest(destPath + '/util'));
});
// 全局配置js文件
gulp.task('config', function() {
    return gulp.src(['./config/*.js'])
        .pipe(babel({
            presets: ['env']
        }))
        // .pipe(uglify())
        .pipe(gulp.dest(destPath + '/config'));
});
// html文件
gulp.task('html', function() {
    // 网站根目录index文件，打开后会自动跳转到前台首页
    gulp.src(['./src/index.html'])
        .pipe(gulp.dest(destPath));
    // src目录下的其他html文件
    return gulp.src(['./src/**/html/*.html', '!' + bowerPath + '/**/*'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin())
        .pipe(gulp.dest(destPath));
});
// 图片文件
gulp.task('images', function() {
    return gulp.src(['./src/**/img/*'])
        .pipe(gulp.dest(destPath));
});
// 清理目标文件夹
gulp.task('clean', function () {
    return del([destPath + '/**/*']);
});

// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
// 如果需要添加新的库或者框架，需要修改以下部分
// 复制使用bower引入的js库的文件，纯js库修改这里
gulp.task('copyJsLib', function() {

    //echarts
    gulp.src(bowerPath + '/echarts/dist/echarts.js')
        .pipe(gulp.dest(destPath + '/lib/js'));
    //mockjs
    gulp.src(bowerPath + '/mockjs/dist/mock.js')
        .pipe(gulp.dest(destPath + '/lib/js'));
    return gulp.src(bowerPath + '/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(destPath + '/lib/js'));
});
// 复制使用bower引入的组件库或样式框架的文件，带样式文件或其他文件的js框架改这里
gulp.task('copyUiLib', function() {
    // layer
    gulp.src(bowerPath + '/layer/dist/**/*')
        .pipe(gulp.dest(destPath + '/lib/layer'));
    //treetable
    gulp.src(bowerPath + '/jquery-treetable/jquery.treetable.js')
        .pipe(gulp.dest(destPath + '/lib/treetable'));
    gulp.src(bowerPath + '/jquery-treetable/css/jquery.treetable.css')
        .pipe(gulp.dest(destPath + '/lib/treetable'));
    //foundation
    gulp.src(bowerPath + '/foundation/js/foundation.min.js')
        .pipe(gulp.dest(destPath + '/lib/foundation'));
    gulp.src(bowerPath + '/foundation/css/foundation.min.css')
        .pipe(gulp.dest(destPath + '/lib/foundation'));
    //vue
    gulp.src(bowerPath + '/vue/dist/vue.min.js')
        .pipe(gulp.dest(destPath + '/lib/vue'));
    // bootstrap
    gulp.src(bowerPath + '/bootstrap/fonts/*')
        .pipe(gulp.dest(destPath + '/lib/fonts'));
    gulp.src(bowerPath + '/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest(destPath + '/lib/bootstrap'));
    return gulp.src(bowerPath + '/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest(destPath + '/lib/bootstrap'));
});
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△

// 监听目标文件夹
gulp.task('watch', function() {
    gulp.watch('./src/**/js/*.js', ['scripts']);
    gulp.watch('./src/util/*.js', ['utils']);
    gulp.watch('./config/*.js', ['config']);
    gulp.watch('./src/**/css/*.css', ['css']);
    gulp.watch('./src/**/*.html', ['html']);
});
// 配置服务器
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: destPath,
            // index: './front/html/index.html'
        },
        port: 8888
    });
    // 监听 html
    gulp.watch([destPath + '/**/*']).on('change', browserSync.reload);
});
// 默认任务
gulp.task('default', function(){
    sequence(
        'clean', 
        'lint', 
        'copyJsLib', 
        'copyUiLib',
        'images',
        'css', 
        'scripts', 
        'utils', 
        'config',
        'html',
        ['server', 'watch']
    );
});