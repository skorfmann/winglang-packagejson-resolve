import * as child_process from 'child_process'
import * as path from 'path'

process.chdir(path.join(process.cwd(), 'with-cdktf'))

const output = child_process.execSync(`npm ci`)

console.log(output.toString())

child_process.execSync(
  `wing compile --debug -t tf-aws main.w`
)
