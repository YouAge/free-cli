/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import test from './modules/data.js'
// Prod环境下开启mock.js功能
export function setupProdMockServer() {
    createProdMockServer([...test])
}
