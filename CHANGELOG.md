# Change Log

## 0.1.0

* Serialize output views: Serialize output data to a hidden file by the same name in the same directory and deserialize on load
* Fix missing `process.env.PWD` variable in Atom >= 1.7
* History transition commands: step-forward (CMD+SHIFT+Z or CMD+Y) and step-backward (CMD+Z) between out history
* History transition animations: Animate outputs in/out, visual style for pending/completed outputs
* Updated ReactComponent plugin: Render output data using any React component by passing the path to the component module and data via props
