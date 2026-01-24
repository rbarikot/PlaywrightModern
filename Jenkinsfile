pipeline {
    agent any
    
    options { timestamps() }

    environment {
        DOCKER_IMAGE = 'playwright-automation'
        TEAMS_WEBHOOK_URL = credentials('teams-webhook-url')
        COMPOSE_PROJECT_NAME = "playwright_%BUILD_NUMBER%"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker-compose build'
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests...'
                bat '''
                docker-compose run --rm ^
                -e TEAMS_WEBHOOK_URL=%TEAMS_WEBHOOK_URL% ^
                playwright-tests
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Publishing reports...'
            
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'testResult\\htmlreport',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'testResult\\smartreport',
                reportFiles: 'smart-report.html',
                reportName: 'Playwright Smart Report'
            ])
            
            archiveArtifacts artifacts: 'testResult/**/*', allowEmptyArchive: true
            
            bat '''
            docker-compose down -v || exit 0
            docker system prune -f
            '''
        }
    }
}
