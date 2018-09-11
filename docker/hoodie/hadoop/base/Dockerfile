FROM openjdk:8-jdk
MAINTAINER Hoodie
USER root

RUN echo 'deb http://deb.debian.org/debian jessie-backports main' > /etc/apt/sources.list.d/jessie-backports.list

RUN chmod o+r /etc/resolv.conf

# Updating & Installing packages
RUN  dpkg --add-architecture i386 \
  && apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y \
  aria2 \
  ant \
  apt-utils \
  autoconf \
  automake \
  build-essential \
  bzip2 \
  bridge-utils \
  ca-certificates \
  clang \
  curl \
  file \
  gcc \
  git \
  groff \
  lib32stdc++6 \
  lib32z1 \
  lib32z1-dev \
  lib32ncurses5 \
  libbz2-1.0:i386 \
  libc6-dev \
  libglu1-mesa \
  libgmp-dev \
  libpci3 \
  libpulse0 \
  libmagic1 \
  libmpc-dev \
  libmpfr-dev \
  libmysql-java \
  libxslt-dev \
  libxml2-dev \
  make \
  maven \
  ncurses-dev \
  netcat \
  ocaml \
  openssh-client \
  pciutils \
  pkg-config \
  procps \
  python-dev \
  python-setuptools \
  qemu-kvm \
  telnet \
  vim \
  unzip \
  wget \
  zip \
  virtinst \
  zlib1g-dev \
    --no-install-recommends \
  && apt-get clean \
  && easy_install pip \
  && pip install virtualenv \
  && rm -rf /var/lib/apt/lists/* 

# Default to UTF-8 file.encoding
ENV LANG C.UTF-8

# passwordless ssh
RUN ssh-keygen -q -N "" -t dsa -f /etc/ssh/ssh_host_dsa_key
RUN ssh-keygen -q -N "" -t rsa -f /etc/ssh/ssh_host_rsa_key
RUN ssh-keygen -q -N "" -t rsa -f /root/.ssh/id_rsa
RUN cp /root/.ssh/id_rsa.pub /root/.ssh/authorized_keys

ARG HADOOP_VERSION=2.8.4 
ARG HADOOP_URL=https://www.apache.org/dist/hadoop/common/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}.tar.gz
ENV HADOOP_VERSION ${HADOOP_VERSION}
ENV HADOOP_URL ${HADOOP_URL}

RUN set -x \
    && echo "Fetch URL2 is : ${HADOOP_URL}" \
    && curl -fSL "${HADOOP_URL}" -o /tmp/hadoop.tar.gz \
    && curl -fSL "${HADOOP_URL}.asc" -o /tmp/hadoop.tar.gz.asc \
    && tar -xvf /tmp/hadoop.tar.gz -C /opt/ \
    && rm /tmp/hadoop.tar.gz*

RUN ln -s /opt/hadoop-$HADOOP_VERSION/etc/hadoop /etc/hadoop
RUN cp /etc/hadoop/mapred-site.xml.template /etc/hadoop/mapred-site.xml
RUN mkdir /opt/hadoop-$HADOOP_VERSION/logs

RUN mkdir /hadoop-data

ENV HADOOP_PREFIX=/opt/hadoop-$HADOOP_VERSION
ENV HADOOP_CONF_DIR=/etc/hadoop
ENV MULTIHOMED_NETWORK=1
ENV HADOOP_HOME=${HADOOP_PREFIX}
ENV HADOOP_INSTALL=${HADOOP_HOME}
 
ENV USER=root
ENV PATH /usr/bin:/bin:$HADOOP_PREFIX/bin/:$PATH

# Add Hoodie installed source and setup links
RUN rm -rf /var/hoodie/
COPY ws/hoodie-bundle.tar.gz /var/hoodie/

RUN cd /var/hoodie && ls && tar -zxvf hoodie-bundle.tar.gz && rm hoodie-bundle.tar.gz && mkdir /var/hoodie/lib \
    && cd lib && export HUDI_SPARK_BUNDLE=`ls ../ws/packaging/hoodie-spark-bundle/target/hoodie-spark-bundle-*.jar | head -1` \
    && export HUDI_HADOOP_BUNDLE=`ls ../ws/packaging/hoodie-hadoop-mr-bundle/target/hoodie-hadoop-mr-bundle-*.jar | head -1` \
    && export HUDI_HIVE_BUNDLE=`ls ../ws/packaging/hoodie-hive-bundle/target/hoodie-hive-bundle-*.jar | head -1` \
    && echo "SPARK Bundle : $HUDI_SPARK_BUNDLE" \
    && echo "Hive Bundle : $HUDI_HIVE_BUNDLE"  \
    && echo "Hadoop-MR Bundle : $HUDI_HADOOP_BUNDLE" \
    && ln $HUDI_HADOOP_BUNDLE hoodie-hadoop-mr-bundle.jar \
    && ln $HUDI_HIVE_BUNDLE hoodie-hive-bundle.jar \
    && ln $HUDI_SPARK_BUNDLE hoodie-spark-bundle.jar \
    && ls -ltr

ENV HUDI_HADOOP_BUNDLE=/var/hoodie/lib/hoodie-hadoop-mr-bundle.jar
ENV HUDI_HIVE_BUNDLE=/var/hoodie/lib/hoodie-hive-bundle.jar
ENV HUDI_SPARK_BUNDLE=/var/hoodie/lib/hoodie-spark-bundle.jar

# Exposing a union of ports across hadoop versions
# Well known ports including ssh
EXPOSE 0-1024
EXPOSE 7000-10100
EXPOSE 5000-5100
# Spark Default Port
EXPOSE 4040
# Proxy
#EXPOSE 8080
#EXPOSE 9000-9010
# dfs.datanode.address
EXPOSE 50010
# dfs.datanode.ipc.address
EXPOSE 50020
# dfs.backup.address
EXPOSE 50100
# dfs.http.address
EXPOSE 50070
# dfs.secondary.http.address
EXPOSE 50090
# dfs.datanode.http.address
EXPOSE 50075 
# dfs.backup.http.address
EXPOSE 50105 
# mapred.job.tracker.http.address
EXPOSE 50030 
#  mapred.task.tracker.http.address
EXPOSE 50060
# fs.default.name
#EXPOSE 8020 
#History
#EXPOSE 8188 
EXPOSE 58188
#DN
EXPOSE 58188 
#EXPOSE 8188
# RM
#EXPOSE 8088
EXPOSE 58088
#NM
EXPOSE 58042 
#EXPOSE 8042
#Hive
#EXPOSE 10000 10002 9083

ADD entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

ADD export_container_ip.sh /usr/bin/
RUN chmod a+x /usr/bin/export_container_ip.sh

ENTRYPOINT ["/entrypoint.sh"]

