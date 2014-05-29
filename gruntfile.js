module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["public/stylesheets/css"]
                },
                files: {
                    "public/stylesheets/main.css": "public/stylesheets/main.less"
                }

            }
        },
        watch: {
            sripts: {
                files: ['public/stylesheets/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                },
            },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
};
