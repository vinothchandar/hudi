echo "Copying spark default config and setting up configs"
cp /var/demo/config/spark-defaults.conf $SPARK_CONF_DIR/.
hadoop fs -mkdir -p /var/demo/
hadoop fs -mkdir -p /tmp/spark-events
hadoop fs -copyFromLocal  -f /var/demo/config /var/demo/.
chmod +x /var/hoodie/ws/hoodie-hive/run_sync_tool.sh
