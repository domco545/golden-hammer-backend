pipeline {
    agent any
    triggers {
		pollSCM("*/10 * * * *")
	}
    stages {
        stage("Build") {
            steps {
                parallel(
                    backend: {
                        sh "npm install"
                        sh "npm run build"
                        sh "docker build . -t domco545/golden-hammer-backend"
                    }
                )
            }
        }
        stage("Test") {
            steps {
                parallel(
                    backend: {
                        sh "npm test"
                    }
                )
            }
        }
        stage("Deliver") {
            steps {
                parallel(
                    api: {
                        withCredentials([usernamePassword(credentialsId: 'DockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                            sh "docker push domco545/golden-hammer-backend"
                        }
                    }
                )
            }
        }
        stage("Release to test") {
            options {
                timeout(time: 1, unit: 'HOURS') 
            }
            input{
                message "Release to test enviroment?"
            }
            steps {
                // sh "docker-compose -p golden-hammer-backend -f docker-compose.test.yml up -d"
                echo "not implemented"
            }
        }
        stage("Release to production") {
            options {
                timeout(time: 1, unit: 'HOURS') 
            }
            input { 
                message "Release to production?"
            }
            steps {
                echo "not implemented"
            }
        }
    }
}