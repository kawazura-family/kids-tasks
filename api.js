// GitHub Contents API モジュール

const API_BASE = `https://api.github.com/repos/${CONFIG.OWNER}/${CONFIG.REPO}/contents`;

function apiHeaders() {
  return {
    Authorization: `token ${CONFIG.TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };
}

function shaKey(yearMonth) {
  return `sha_${yearMonth}`;
}

async function readMonthData(yearMonth) {
  const path = `${CONFIG.DATA_PATH}/${yearMonth}.json`;
  try {
    const res = await fetch(`${API_BASE}/${path}`, { headers: apiHeaders() });
    if (res.status === 404) {
      return {};
    }
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const json = await res.json();
    localStorage.setItem(shaKey(yearMonth), json.sha);
    const decoded = atob(json.content.replace(/\n/g, ''));
    return JSON.parse(decoded);
  } catch (err) {
    console.error('readMonthData failed:', err);
    // ローカルキャッシュから読む
    const cached = localStorage.getItem(`cache_${yearMonth}`);
    if (cached) return JSON.parse(cached);
    return {};
  }
}

async function writeMonthData(yearMonth, data) {
  const path = `${CONFIG.DATA_PATH}/${yearMonth}.json`;
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
  const sha = localStorage.getItem(shaKey(yearMonth));

  const body = {
    message: `update ${yearMonth}`,
    content: content,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${API_BASE}/${path}`, {
    method: 'PUT',
    headers: apiHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    // sha不一致の場合、最新を取得してリトライ
    if (res.status === 409 || (res.status === 422 && errText.includes('sha'))) {
      console.warn('SHA mismatch, refetching...');
      await readMonthData(yearMonth); // shaを更新
      return writeMonthData(yearMonth, data); // リトライ
    }
    throw new Error(`PUT failed: ${res.status} ${errText}`);
  }

  const json = await res.json();
  localStorage.setItem(shaKey(yearMonth), json.content.sha);
  // ローカルキャッシュも更新
  localStorage.setItem(`cache_${yearMonth}`, JSON.stringify(data));
  return json;
}
