pushd ../
mvn clean pre-integration-test -DskipTests -Ddocker.compose.skip=true
popd
