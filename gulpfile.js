
const {src , dest , watch , parallel} = require("gulp");
// const sass = require("gulp-sass");

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer=require('autoprefixer');
const cssnano= require('cssnano');
const postcss= require('gulp-postcss');
const sourcemaps= require('gulp-sourcemaps');
//Imagenes
const cache=require('gulp-cache');
const imagemin=require('gulp-imagemin');
const webp = require('gulp-webp');
// const avif = require('gulp-avif');

//----------------------------------------------

//JAVASCRIPT
const terser =require('gulp-terser-js');

function css(done){


    src('src/scss/**/*.scss')//Identificar el archivo SASS
    .pipe(sourcemaps.init())//)
    .pipe(plumber())//Compilarlo
    .pipe(sass())//Compilarlo
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"))//Almacenarla en el disco duro


    done(); //Callback que avisa a gulp cuando termine 
}

function imagenes(done){
    
    const opciones ={
        optimizationLevel:3
    }
    src('src/img/**/*.{png,jpg}')//Identificar el archivo de Imagen
    .pipe(cache(imagemin(opciones)))//Compilarlo
   
   
    .pipe(dest("build/img"))//Almacenarla en el disco duro

    done(); //Callback que
}


function versionWebp(done){
    const opciones={
        quality:50
    };

    src('src/img/**/*.{png,jpg}')//Identificar el archivo SASS
    .pipe(webp(opciones))//Compilarlo
   
   
    .pipe(dest("build/img"))//Almacenarla en el disco duro


    done(); //Callback que avisa a gulp cuando llegamos al final


}

// function versionAvif(done){
//     const opciones={
//         quality:90
//     };

//     src('src/img/**/*.{png,jpg}')//Identificar el archivo SASS
//     .pipe(avif(opciones))//Compilarlo
   
   
//     .pipe(dest("build/img"))//Almacenarla en el disco duro


//     done(); //Callback que avisa a gulp cuando llegamos al final


// }

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/js"));
        done(); //Callback que avisa
}

function dev(done){
    watch('src/scss/**/*.scss',css)
    watch('src/js/**/*.js',javascript);
    done(); //Callback que avisa a gulp cuando
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
// exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes,versionWebp,javascript,dev); //Primero ejecuta version webp y luego dev 
