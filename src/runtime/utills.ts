import config from './config';
const siteEnv = config.siteEnv;

export function skipByEnvsLimited(
  envsSupported: string[],
  info?: string
): string {
  return envsSupported.includes(siteEnv)
    ? ''
    : `Only Supported Env: ${JSON.stringify(
        envsSupported
      )}, But current env: ${siteEnv}${info ? ` => ${info}` : ''}`;
}

export function skipByEnvsUnsupported(
  envsUnsupported: string[],
  info?: string
): string {
  return envsUnsupported.includes(siteEnv)
    ? `Unsupported Env: ${JSON.stringify(
        envsUnsupported
      )}, But current env: ${siteEnv}${info ? ` => ${info}` : ''}`
    : '';
}

export async function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
