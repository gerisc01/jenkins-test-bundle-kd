pipeline {
  agent any
  stages {
    stage('Prepare Environment') {
      steps {
        echo 'Installing/Updating Yarn and making sure bundle libraries are up to date'
        sh 'curl -o- -L https://yarnpkg.com/install.sh | bash'
        sh 'yarn install'
        echo 'Installing/Updating AWS CLI'
        sh 'curl -O https://bootstrap.pypa.io/get-pip.py'
        sh 'python get-pip.py --user'
        sh '/var/lib/jenkins/.local/bin/pip install awscli --upgrade --user'
        echo 'Setting AWS Credentials in files at ~/.aws for the CLI to use'
        withCredentials(bindings: [[$class: 'UsernamePasswordMultiBinding', credentialsId: 'd9b3e21f-24a7-4d0b-8be8-e55eab29894f',
                                                                                                                                                  usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
          sh 'mkdir -p ~/.aws'
          sh '''printf \'%s
\' \'[default]\' \'output = json\' \'region = us-east-1\' > config'''
          sh '''printf \'%s
\' \'[default]\' \'aws_access_key_id = $USERNAME\' \'aws_secret_access_key = $PASSWORD\' > credentials'''
        }
        
      }
    }
    stage('Test') {
      steps {
        echo 'Test bundle'
      }
    }
    stage('Build') {
      steps {
        echo 'Build bundle'
      }
    }
    stage('Upload to S3') {
      environment {
        S3DIR = sh(script: 'echo `expr "$GIT_URL" : \'^.*/\\(.*\\)\\.git$\'`')
      }
      steps {
        echo $S3DIR
      }
    }
  }
}
