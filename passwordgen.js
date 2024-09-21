function showToast(message, isSuccess) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  toastMessage.textContent = message;

  if (isSuccess) {
      toast.classList.remove('bg-red-600');
      toast.classList.add('bg-green-600');
      toastIcon.innerHTML = '<i class="fas fa-check-circle text-white text-2xl"></i>';
  } else {
      toast.classList.remove('bg-green-600');
      toast.classList.add('bg-red-600');
      toastIcon.innerHTML = '<i class="fas fa-exclamation-circle text-white text-2xl"></i>';
  }

  toast.classList.remove('hidden', 'opacity-0', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4');

      setTimeout(() => {
          toast.classList.add('hidden');
      }, 300);
  }, 8000);
}
function generatePassword(length, options) {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';

  let characters = '';
  if (options.uppercase) characters += uppercase;
  if (options.lowercase) characters += lowercase;
  if (options.numbers) characters += numbers;
  if (options.symbols) characters += symbols;

  let password = '';
  for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password;
}

document.getElementById('lengthSlider').addEventListener('input', function() {
  document.getElementById('lengthValue').textContent = this.value;
});

document.getElementById('generateBtn').addEventListener('click', () => {
  const length = parseInt(document.getElementById('lengthSlider').value, 10);
  const options = {
      uppercase: document.getElementById('uppercase').checked,
      lowercase: document.getElementById('lowercase').checked,
      numbers: document.getElementById('numbers').checked,
      symbols: document.getElementById('symbols').checked,
  };

  if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
      showToast('Select at least one option!', false);
      return;
  }

  const password = generatePassword(length, options);
  document.getElementById('password').value = password;
  showToast('Password generated successfully!', true);
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const passwordField = document.getElementById('password');
  const password = passwordField.value;

  if (password.length > 0) {
      passwordField.select();
      document.execCommand('copy');
      showToast('Password copied to clipboard!', true);
  } else {
      showToast('Nothing to copy!', false);
  }
});
