pipeline {
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
                sh 'docker restart you-node' 
            }
        }
    }
}
