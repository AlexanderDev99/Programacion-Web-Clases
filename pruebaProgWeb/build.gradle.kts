plugins {
    id("java")
}

group = "ec.edu.uce.MiBanco"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

val restEasyVersion = "7.0.2.Final"
val weldVersion = "6.0.4.Final"
val hibernateVersion = "7.4.1.Final"

dependencies {

    //Rest
    implementation("org.jboss.resteasy:resteasy-core:${restEasyVersion}")
    implementation("org.jboss.resteasy:resteasy-jackson2-provider:${restEasyVersion}")
    implementation("org.jboss.resteasy:resteasy-undertow-cdi:7.0.2.Final")

    //JPA
    implementation("org.hibernate.orm:hibernate-core:${hibernateVersion}")

    //DATABASE
    implementation("org.postgresql:postgresql:42.7.11")

    //CDI
    implementation("org.jboss.weld:weld-core-impl:${weldVersion}")

    //LOMBOK
    compileOnly("org.projectlombok:lombok:1.18.46")
    annotationProcessor("org.projectlombok:lombok:1.18.46")

    //DATA
    implementation("org.apache.deltaspike.modules:deltaspike-data-module-api:2.0.1")
    implementation("org.apache.deltaspike.modules:deltaspike-data-module-impl:2.0.1")
}

tasks.withType<JavaCompile>{
    options.release.set(21)
}

sourceSets{
    main{
        output.setResourcesDir(file("${buildDir}/classes/java/main")
        )
    }
}