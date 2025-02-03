import os from 'os'

export const getLocalIpAddress = (): string | null => {
  const networkInterfaces = os.networkInterfaces()

  for (const interfaceName in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceName]
    if (!networkInterface) continue

    for (const net of networkInterface) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address
      }
    }
  }

  return null
}
