module.exports = {
  serverConfig: {
    isStaticServer: true,
    hostname: '127.0.0.1',
    port: 80,
    base: 'dist',
    rootPath: './dist/',
    livereload: true,
  },

  uglifyConfig: {
    output: {
      comments: /^!/
    }
  },

  sassConfig: {
    outputStyle: 'compressed'
  },

  htmlConfig: {
    collapseWhitespace: true
  },

  paths: {
    src: './src',
    dest: './dist',

    js: {
      src: './src/js',
      dest: './dist/js'
    },

    images: {
      src: './src/images',
      dest: './dist'
    },

    styles: {
      src: './src/scss',
      dest: './dist/css'
    },

    pages: {
      src: './src/pages',
      dest: './dist'
    },
  }
};
