# Create host mount directory and copy
mkdir -p /tmp/demo
mkdir -p /tmp/kafka-data/
mkdir -p /tmp/hadoop_name
mkdir -p /tmp/hadoop_data
cp demo/setup_demo_container.sh /tmp/demo/.
cp -r demo/config /tmp/demo/.
chmod +x /tmp/demo/setup_demo_container.sh 

rm -rf /tmp/kafka-data/*

# restart cluster
docker-compose -f demo/docker-compose-demo.yml down
rm -rf /tmp/hadoop_data/*
rm -rf /tmp/hadoop_name/*
sleep 5
docker-compose -f demo/docker-compose-demo.yml up -d
sleep 15

docker exec -it adhoc-1 /bin/bash /var/demo/setup_demo_container.sh
docker exec -it adhoc-2 /bin/bash /var/demo/setup_demo_container.sh
docker exec -it spark-worker-1 /bin/bash /var/demo/setup_demo_container.sh
