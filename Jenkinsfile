pipeline {
    agent {
        docker {
            image 'busybox' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'echo build ok' 
            }
        }
        stage('Deploy') { 
            steps {
                sh 'rm -rf /node/*' 
                sh 'cp -a ./* /node' 
                sh 'ip a'
                sh 'hostname'
                sh 'curl -X POST --unix-socket /var/run/docker.sock http:/containers/you-node/restart' 
            }
        }
    }
}
