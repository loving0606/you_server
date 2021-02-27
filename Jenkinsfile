pipeline {
    agent {
        docker {
            image 'nginx' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'hostname' 
            }
        }
        stage('Deploy') { 
            steps {
                sh 'rm -rf /node/*' 
                sh 'cp -a ./* /node' 
                sh 'hostname'
                sh 'curl -X POST --unix-socket /var/run/docker.sock http:/containers/you-node/restart' 
            }
        }
    }
}
