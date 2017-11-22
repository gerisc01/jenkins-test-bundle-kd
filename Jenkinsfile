pipeline {
  agent any
  stages {
    stage('Prepare Environment') {
      steps {
        sh 'echo `expr "$GIT_URL" : \'^.*/\\(.*\\)\\.git$\'`'
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
        sh 'yarn test:ci'
        junit(testResults: 'test-report.xml', healthScaleFactor: 1)
      }
    }
    stage('Build') {
      steps {
        sh 'yarn run build'
      }
    }
    stage('Upload to S3') {
      steps {
        sh '/var/lib/jenkins/.local/bin/aws s3 sync dist s3://shayne-test1/$S3DIR --acl public-read --metadata "cache-control=must-revalidate; max-age: 0"'
      }
    }
  }
  environment {
    S3DIR = sh(returnStdout: true, script: 'echo `expr "$GIT_URL" : \'^.*/\\(.*\\)\\.git$\'`')
  }
  post {
    success {
      mail(subject: "Successful Build: Bundle '${currentBuild.fullDisplayName}'", body: 'Congrats, your recent bundle build was successful!', to: 'scott.gerike@kineticdata.com', from: 'scott.gerike@kineticdata.com')
      
    }
    
    failure {
      mail(subject: "Failed Build: Bundle '${currentBuild.fullDisplayName}'", body: 'Congrats, your recent bundle build failed.', to: 'scott.gerike@kineticdata.com', from: 'scott.gerike@kineticdata.com')
      
    }
    
  }
}