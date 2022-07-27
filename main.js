import fetchIpInfo from './src/fetch-ip-info'

const form = document.querySelector('.form')
const contentInfo = document.querySelector('#info')
const btnSubmit = document.querySelector('#btnSubmit')
const btnGetIp = document.querySelector('#getIp')
const themeSwitch = document.querySelector('#theme-switch')
const html = document.querySelector('html')

const expRegIP = /^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$/

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  let input = event.target[0]
  let { value } = input
  if (expRegIP.test(value)) {
    input.setAttribute('aria-invalid', 'false')
    btnSubmit.setAttribute('aria-busy', 'true')
    btnSubmit.setAttribute('disabled', '')
    const data = await fetchIpInfo(value)
    btnSubmit.removeAttribute('aria-busy')
    btnSubmit.removeAttribute('disabled')
    contentInfo.innerHTML = JSON.stringify(data, null, 2)
  } else if (!expRegIP.test(value)) {
    input.setAttribute('aria-invalid', 'true')
    alert('Wrong parameter')
  }
})

const getMyIp = async (e) => {
  e.target.setAttribute('disabled', '')
  e.target.setAttribute('aria-busy', 'true')
  const { ip } = await fetch('https://api.ipify.org?format=json')
    .then((res) => res.json())
    .catch((err) => console.error(err))
  if (ip) {
    form[0].value = ip
  }
  e.target.removeAttribute('aria-busy')
  e.target.removeAttribute('disabled')
}

btnGetIp.addEventListener('click', (event) => getMyIp(event))

themeSwitch.checked = false
themeSwitch.addEventListener('click', (event) => {
  if (event.target.checked) html.setAttribute('data-theme', 'light')
  if (!event.target.checked) html.setAttribute('data-theme', 'dark')
})
