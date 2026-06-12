plugins {
    id("java")
}

group = "ec.edu.uce.MiBanco"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {

    //Motor de servicios
    implementation("org.jboss.resteasy:resteasy-core:7.0.2.Final")

    //Contenedor HTTP
    implementation("org.jboss.resteasy:resteasy-undertow:7.0.2.Final")

}

tasks.test {
    useJUnitPlatform()
}