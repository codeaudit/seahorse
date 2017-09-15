// Copyright (c) 2015, CodiLime Inc.
//
// Owner: Radoslaw Kotowski

organization := "io.deepsense"
name         := "deepsense-graph"
version      := "0.1.0"
scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  "org.scalatest"          %% "scalatest"     % "2.2.4"  % "test",
  "com.github.nscala-time" %% "nscala-time"   % "1.8.0"
)

// Fork to run all test and run tasks in JVM separated from sbt JVM
fork := true
