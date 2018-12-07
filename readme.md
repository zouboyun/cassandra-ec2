# Deploying Cassandra on AWS EC2 step by step
> This documentation is written for deloying Cassandra with Simple Strategy and one data center on EC2 t2.micro instance.

#### Creating an EC2 instance
1. Get a free account on aws ec2, you get 750 hours free time per month, 30GB free storage in total (for all your instances)
2. Select Ubuntu 18 as the operating system
3. Adjust storage of volume from 8G to 30G
4. Follow this tutorial to finish your setup
[**AWS EC2 Tutorial**](https://www.ybrikman.com/writing/2015/11/11/running-docker-aws-ground-up/)

#### Installing Cassandra on EC2
1. SSH into your EC2 instance, check your current java version by running
```
sudo apt update
java -version
```
2. If your java is not 1.8.0, run the following to update
```
sudo apt install openjdk-8-jdk
java -version
```
3. Download Cassandra from [**their official website**](http://cassandra.apache.org/download/)
```
echo "deb http://www.apache.org/dist/cassandra/debian 311x main" | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list
curl https://www.apache.org/dist/cassandra/KEYS | sudo apt-key add -
sudo apt-get update
sudo apt-get install cassandra
```

#### Running Cassandra on EC2
1. Start Cassandra as a service
```
sudo service cassandra start
```
2. Check status of running Cassandra
```
sudo service cassandra status
```
3.  Restart Cassandra
```
sudo service cassandra restart
```
4. Stop Cassandra
```
sudo service cassandra stop
```