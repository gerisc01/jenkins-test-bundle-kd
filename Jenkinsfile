pipeline {
  agent any
  stages {
    stage('Prepare Environment') {
      steps {
        echo 'Installing/Updating Yarn and making sure bundle libraries are up to date'
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
      withEnv(['S3DIR=sh(returnStdout: true, script: 'echo `expr "$GIT_URL" : \'^.*/\\(.*\\)\\.git$\'`')']) {
        sh '/var/lib/jenkins/.local/bin/aws s3 sync dist s3://shayne-test1/$S3DIR --acl public-read --metadata "cache-control=must-revalidate; max-age: 0"'
      }
    }
  }
}
