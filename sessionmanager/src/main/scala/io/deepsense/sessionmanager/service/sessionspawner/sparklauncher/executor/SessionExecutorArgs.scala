/**
 * Copyright (c) 2016, CodiLime Inc.
 */

package io.deepsense.sessionmanager.service.sessionspawner.sparklauncher.executor

import io.deepsense.sessionmanager.rest.requests.ClusterDetails
import io.deepsense.sessionmanager.service.sessionspawner.SessionConfig
import io.deepsense.sessionmanager.service.sessionspawner.sparklauncher.SparkLauncherConfig

object SessionExecutorArgs {

  // TODO Have args parser/formatter in we.jar and use it here to have type-safety

  def apply(
      sessionConfig: SessionConfig,
      config: SparkLauncherConfig,
      clusterConfig: ClusterDetails): Seq[String] = Seq(
    "--interactive-mode",
    "--message-queue-host", clusterConfig.userIP,
    "--message-queue-port", config.queuePort.toString,
    "--message-queue-user", config.queueUser,
    "--message-queue-pass", config.queuePass,
    "--wm-address", wmAddress(config, clusterConfig),
    "--workflow-id", sessionConfig.workflowId.toString(),
    "--deps-zip", config.weDepsPath,
    "--wm-username", config.wmUsername,
    "--wm-password", config.wmPassword,
    "--user-id", sessionConfig.userId,
    "--temp-dir", config.tempDir,
    "--python-binary", config.pythonBinary
  )

  private def wmAddress(
    config: SparkLauncherConfig,
    clusterConfig: ClusterDetails): String =
  s"${config.wmScheme}://${clusterConfig.userIP}:${config.wmPort}"

}
