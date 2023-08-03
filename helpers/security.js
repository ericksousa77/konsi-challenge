import crypto from 'crypto'
import { ENCRYPTION_ALGORITHM, ENCRYPTION_KEY } from '../config/config'

// Função para criptografar o dado
export const encrypt = data => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(
    ENCRYPTION_ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv
  )

  let encryptedData = cipher.update(data, 'utf8', 'hex')
  encryptedData += cipher.final('hex')

  const hmac = crypto.createHmac('sha256', Buffer.from(ENCRYPTION_KEY))
  hmac.update(encryptedData)
  const authenticationTag = hmac.digest('hex')

  return `${iv.toString('hex')}:${authenticationTag}:${encryptedData}`
}

// Função para descriptografar o dado
export const decrypt = encryptedData => {
  const [ivHex, authenticationTagHex, data] = encryptedData.split(':')
  const iv = Buffer.from(ivHex, 'hex')

  const decipher = crypto.createDecipheriv(
    ENCRYPTION_ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv
  )
  let decryptedData = decipher.update(data, 'hex', 'utf8')
  decryptedData += decipher.final('utf8')

  const hmac = crypto.createHmac('sha256', Buffer.from(ENCRYPTION_KEY))
  hmac.update(data)
  const computedAuthenticationTag = hmac.digest('hex')

  if (computedAuthenticationTag !== authenticationTagHex) {
    throw new Error('Autenticação falhou. Dados comprometidos.')
  }

  return decryptedData
}
