const avatarOptions = ["🌙", "⭐", "🔮", "🦉", "🪐", "✨"];
let currentProfile = null;

const profileText = {
  "zh-CN": { title:"创建本地档案", note:"这是本地档案，不是云端账号，不能跨设备同步。清除缓存或卸载 App 可能会丢失。", nickname:"昵称", avatar:"头像", birthday:"出生日期（可选）", gender:"性别（可选）", genderNone:"不填写", female:"女性", male:"男性", nonbinary:"非二元", other:"其他", defaultLanguage:"默认语言", saveHistory:"允许保存占卜历史", save:"保存并进入", edit:"个人中心", required:"请先填写昵称。" },
  "zh-TW": { title:"建立本機檔案", note:"這是本機檔案，不是雲端帳號，不能跨裝置同步。清除快取或卸載 App 可能會遺失。", nickname:"暱稱", avatar:"頭像", birthday:"出生日期（可選）", gender:"性別（可選）", genderNone:"不填寫", female:"女性", male:"男性", nonbinary:"非二元", other:"其他", defaultLanguage:"預設語言", saveHistory:"允許保存占卜歷史", save:"保存並進入", edit:"個人中心", required:"請先填寫暱稱。" },
  en: { title:"Create local profile", note:"This is a local profile, not a cloud account. It cannot sync across devices and may be lost if cache is cleared or the app is removed.", nickname:"Nickname", avatar:"Avatar", birthday:"Birthday (optional)", gender:"Gender (optional)", genderNone:"Prefer not to say", female:"Female", male:"Male", nonbinary:"Non-binary", other:"Other", defaultLanguage:"Default language", saveHistory:"Allow reading history on this device", save:"Save and enter", edit:"Profile", required:"Please enter a nickname." },
  ja: { title:"ローカルプロフィール作成", note:"これはクラウドアカウントではなく端末内プロフィールです。端末間同期はできず、キャッシュ削除やアンインストールで失われる場合があります。", nickname:"ニックネーム", avatar:"アバター", birthday:"生年月日（任意）", gender:"性別（任意）", genderNone:"回答しない", female:"女性", male:"男性", nonbinary:"ノンバイナリー", other:"その他", defaultLanguage:"既定の言語", saveHistory:"この端末に履歴を保存する", save:"保存して入る", edit:"プロフィール", required:"ニックネームを入力してください。" },
  ko: { title:"로컬 프로필 만들기", note:"이 프로필은 클라우드 계정이 아닌 기기 내 프로필입니다. 기기 간 동기화가 되지 않으며 캐시 삭제나 앱 제거 시 사라질 수 있습니다.", nickname:"닉네임", avatar:"아바타", birthday:"생일(선택)", gender:"성별(선택)", genderNone:"응답 안 함", female:"여성", male:"남성", nonbinary:"논바이너리", other:"기타", defaultLanguage:"기본 언어", saveHistory:"이 기기에 리딩 기록 저장 허용", save:"저장하고 들어가기", edit:"프로필", required:"닉네임을 입력하세요." },
  es: { title:"Crear perfil local", note:"Este perfil es local, no una cuenta en la nube. No se sincroniza entre dispositivos y puede perderse al borrar caché o desinstalar.", nickname:"Apodo", avatar:"Avatar", birthday:"Fecha de nacimiento (opcional)", gender:"Género (opcional)", genderNone:"Prefiero no decir", female:"Mujer", male:"Hombre", nonbinary:"No binario", other:"Otro", defaultLanguage:"Idioma predeterminado", saveHistory:"Permitir historial en este dispositivo", save:"Guardar y entrar", edit:"Perfil", required:"Escribe un apodo." },
  fr: { title:"Créer un profil local", note:"Ce profil est local, pas un compte cloud. Il ne se synchronise pas entre appareils et peut être perdu si le cache est effacé ou l’app supprimée.", nickname:"Pseudo", avatar:"Avatar", birthday:"Date de naissance (facultatif)", gender:"Genre (facultatif)", genderNone:"Ne pas préciser", female:"Femme", male:"Homme", nonbinary:"Non binaire", other:"Autre", defaultLanguage:"Langue par défaut", saveHistory:"Autoriser l’historique sur cet appareil", save:"Enregistrer et entrer", edit:"Profil", required:"Veuillez saisir un pseudo." },
  de: { title:"Lokales Profil erstellen", note:"Dieses Profil ist lokal und kein Cloud-Konto. Es synchronisiert nicht zwischen Geräten und kann beim Löschen des Caches oder Entfernen der App verloren gehen.", nickname:"Spitzname", avatar:"Avatar", birthday:"Geburtstag (optional)", gender:"Geschlecht (optional)", genderNone:"Keine Angabe", female:"Weiblich", male:"Männlich", nonbinary:"Nichtbinär", other:"Andere", defaultLanguage:"Standardsprache", saveHistory:"Verlauf auf diesem Gerät erlauben", save:"Speichern und starten", edit:"Profil", required:"Bitte einen Spitznamen eingeben." },
  pt: { title:"Criar perfil local", note:"Este perfil é local, não uma conta na nuvem. Não sincroniza entre dispositivos e pode ser perdido ao limpar cache ou remover o app.", nickname:"Apelido", avatar:"Avatar", birthday:"Data de nascimento (opcional)", gender:"Gênero (opcional)", genderNone:"Prefiro não dizer", female:"Feminino", male:"Masculino", nonbinary:"Não binário", other:"Outro", defaultLanguage:"Idioma padrão", saveHistory:"Permitir histórico neste dispositivo", save:"Salvar e entrar", edit:"Perfil", required:"Digite um apelido." },
  ru: { title:"Создать локальный профиль", note:"Это локальный профиль, а не облачная учётная запись. Он не синхронизируется между устройствами и может исчезнуть при очистке кэша или удалении приложения.", nickname:"Никнейм", avatar:"Аватар", birthday:"Дата рождения (необязательно)", gender:"Пол (необязательно)", genderNone:"Не указывать", female:"Женский", male:"Мужской", nonbinary:"Небинарный", other:"Другое", defaultLanguage:"Язык по умолчанию", saveHistory:"Разрешить историю на этом устройстве", save:"Сохранить и войти", edit:"Профиль", required:"Введите никнейм." },
  ar: { title:"إنشاء ملف محلي", note:"هذا ملف محلي وليس حسابًا سحابيًا. لا يتزامن بين الأجهزة وقد يضيع عند مسح التخزين المؤقت أو إزالة التطبيق.", nickname:"الاسم", avatar:"الصورة", birthday:"تاريخ الميلاد (اختياري)", gender:"الجنس (اختياري)", genderNone:"أفضل عدم الإجابة", female:"أنثى", male:"ذكر", nonbinary:"غير ثنائي", other:"آخر", defaultLanguage:"اللغة الافتراضية", saveHistory:"السماح بحفظ السجل على هذا الجهاز", save:"حفظ والدخول", edit:"الملف", required:"أدخل الاسم أولًا." },
  hi: { title:"स्थानीय प्रोफ़ाइल बनाएँ", note:"यह स्थानीय प्रोफ़ाइल है, क्लाउड खाता नहीं। यह उपकरणों में सिंक नहीं होती और कैश साफ़ करने या ऐप हटाने पर खो सकती है।", nickname:"उपनाम", avatar:"अवतार", birthday:"जन्मदिन (वैकल्पिक)", gender:"लिंग (वैकल्पिक)", genderNone:"न बताना चाहूँगा", female:"महिला", male:"पुरुष", nonbinary:"नॉन-बाइनरी", other:"अन्य", defaultLanguage:"डिफ़ॉल्ट भाषा", saveHistory:"इस डिवाइस पर इतिहास सहेजने दें", save:"सहेजें और प्रवेश करें", edit:"प्रोफ़ाइल", required:"कृपया उपनाम दर्ज करें।" }
};

function getProfileText(language) {
  return profileText[language] || profileText.en;
}

function initUserProfileUi({ onProfileSaved, getLanguage }) {
  currentProfile = StorageAdapter.getProfile();
  renderProfileLanguageText(getLanguage());
  renderAvatarOptions(currentProfile?.avatar || avatarOptions[0]);
  populateProfileForm(currentProfile, getLanguage());

  document.querySelector("#profileEditButton").addEventListener("click", () => showProfileSetup(getLanguage()));
  document.querySelector("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const language = document.querySelector("#profileDefaultLanguage").value;
    const nickname = document.querySelector("#profileNickname").value.trim();
    const text = getProfileText(language);
    if (!nickname) {
      document.querySelector("#profileError").textContent = text.required;
      return;
    }
    currentProfile = {
      nickname,
      avatar: document.querySelector("input[name='profileAvatar']:checked")?.value || avatarOptions[0],
      birthday: document.querySelector("#profileBirthday").value,
      gender: document.querySelector("#profileGender").value,
      defaultLanguage: language,
      saveHistory: document.querySelector("#profileSaveHistory").checked,
      updatedAt: new Date().toISOString()
    };
    StorageAdapter.saveProfile(currentProfile);
    hideProfileSetup();
    onProfileSaved(currentProfile);
  });

  if (!currentProfile) showProfileSetup(getLanguage());
}

function renderProfileLanguageText(language) {
  const text = getProfileText(language);
  document.querySelector("#profileTitle").textContent = text.title;
  document.querySelector("#profileLocalNote").textContent = text.note;
  document.querySelector("#profileNicknameLabel").textContent = text.nickname;
  document.querySelector("#profileAvatarLabel").textContent = text.avatar;
  document.querySelector("#profileBirthdayLabel").textContent = text.birthday;
  document.querySelector("#profileGenderLabel").textContent = text.gender;
  document.querySelector("#profileLanguageLabel").textContent = text.defaultLanguage;
  document.querySelector("#profileHistoryLabel").textContent = text.saveHistory;
  document.querySelector("#profileSaveButton").textContent = text.save;
  document.querySelector("#profileEditButton").textContent = text.edit;

  document.querySelector("#profileGender").innerHTML = `
    <option value="">${text.genderNone}</option>
    <option value="female">${text.female}</option>
    <option value="male">${text.male}</option>
    <option value="nonbinary">${text.nonbinary}</option>
    <option value="other">${text.other}</option>
  `;

  const selectedLanguage = document.querySelector("#profileDefaultLanguage").value || language;
  document.querySelector("#profileDefaultLanguage").innerHTML = supportedLanguages.map((item) => `<option value="${item.code}">${item.label}</option>`).join("");
  document.querySelector("#profileDefaultLanguage").value = matchSupportedLanguage(selectedLanguage) || language;
}

function renderAvatarOptions(selectedAvatar) {
  document.querySelector("#profileAvatarOptions").innerHTML = avatarOptions.map((avatar, index) => `
    <label class="avatar-option">
      <input type="radio" name="profileAvatar" value="${avatar}" ${avatar === selectedAvatar || (!selectedAvatar && index === 0) ? "checked" : ""}>
      <span>${avatar}</span>
    </label>
  `).join("");
}

function populateProfileForm(profile, language) {
  document.querySelector("#profileNickname").value = profile?.nickname || "";
  document.querySelector("#profileBirthday").value = profile?.birthday || "";
  document.querySelector("#profileSaveHistory").checked = profile?.saveHistory ?? true;
  // Profile defaults control the form selection, not the language of the
  // currently visible interface. A manual language choice must win here.
  renderProfileLanguageText(language);
  document.querySelector("#profileGender").value = profile?.gender || "";
  document.querySelector("#profileDefaultLanguage").value = profile?.defaultLanguage || language;
  renderAvatarOptions(profile?.avatar || avatarOptions[0]);
}

function showProfileSetup(language) {
  populateProfileForm(StorageAdapter.getProfile(), language);
  document.querySelector("#profileError").textContent = "";
  document.querySelector("#profileSetupPage").classList.remove("hidden");
}

function hideProfileSetup() {
  document.querySelector("#profileSetupPage").classList.add("hidden");
}

function getCurrentProfile() {
  return currentProfile;
}
