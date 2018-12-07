# Deploying Cassandra on AWS EC2 step by step
> This documentation is written for deloying Cassandra with Simple Strategy and one data center on EC2 t2.micro instance.

#### Creating an EC2 instance
1. Get a free account on aws ec2, you get 750 hours free time per month, 30GB free storage in total (for all your instances)
2. Select Ubuntu 18 as the operating system
3. Adjust storage of volume from 8G to 30G
4. Follow this tutorial to finish your setup
[**AWS EC2 Tutorial**](https://www.ybrikman.com/writing/2015/11/11/running-docker-aws-ground-up/)

#### Installing Cassandra on EC2
1. Ssh into your EC2 instance, check your current java version by running
```
java -version
```