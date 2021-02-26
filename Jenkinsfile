pipeline {
    agent {
        docker {
            image 'nginx' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'ip a'
                sh 'hostname' 
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
