/**
 * Copyright 2016, deepsense.ai
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


package io.deepsense.deeplang.doperables.serialization

import org.apache.spark.ml.util.MLReader

import io.deepsense.deeplang.doperables.Transformer
import io.deepsense.sparkutils.ML
import io.deepsense.sparkutils.ML.MLReaderWithSparkContext

class SerializableSparkModelMLReader[M <: ML.Model[M]]
    extends MLReader[SerializableSparkModel[M]]
    with MLReaderWithSparkContext {

  override def load(path: String): SerializableSparkModel[M] = {
    val modelPath = Transformer.modelFilePath(path)
    new SerializableSparkModel(CustomPersistence.load[M](sparkContext, modelPath))
  }
}
