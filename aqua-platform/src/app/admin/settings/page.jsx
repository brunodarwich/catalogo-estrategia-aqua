import { updateStoreSettings } from '../actions';
import { requireAdminUser } from '@/lib/admin-auth';
import { getPrisma } from '@/lib/prisma';

const getValue = (store, path, fallback = '') =>
  path.split('.').reduce((current, key) => current?.[key], store) || fallback;

export default async function AdminSettingsPage() {
  await requireAdminUser({ strategicOnly: true });
  const setting = await getPrisma().storeSetting.findUnique({
    where: { key: 'store' },
  });
  const store = setting?.value || {};

  return (
    <>
      <header className="admin-header">
        <div>
          <span className="eyebrow">Configurações</span>
          <h1>Loja AQUA</h1>
          <p className="muted">Edite dados públicos persistidos em `store_settings`.</p>
        </div>
      </header>

      <form action={updateStoreSettings} className="admin-panel admin-form wide-form">
        <div className="form-row">
          <label>
            Nome da marca
            <input name="name" defaultValue={store.name || ''} required />
          </label>
          <label>
            WhatsApp
            <input name="whatsappPhone" defaultValue={store.whatsappPhone || ''} />
          </label>
          <label>
            Instagram
            <input name="instagramUrl" defaultValue={store.instagramUrl || ''} />
          </label>
        </div>

        <div className="form-row">
          <label>
            Logo
            <input name="logoUrl" defaultValue={store.logoUrl || ''} placeholder="/logo.svg" />
          </label>
          <label>
            Vídeo da hero
            <input name="heroVideoSrc" defaultValue={getValue(store, 'hero.videoSrc')} />
          </label>
          <label>
            Poster da hero
            <input name="heroPosterSrc" defaultValue={getValue(store, 'hero.posterSrc')} />
          </label>
        </div>

        <label>
          Título sobre a AQUA
          <input name="aboutTitle" defaultValue={getValue(store, 'institutional.aboutTitle')} />
        </label>
        <label>
          Texto sobre a AQUA
          <textarea name="aboutText" rows="4" defaultValue={getValue(store, 'institutional.aboutText')} />
        </label>
        <label>
          Política de privacidade
          <textarea name="privacyPolicy" rows="4" defaultValue={getValue(store, 'legal.privacyPolicy')} />
        </label>
        <label>
          Termos de uso
          <textarea name="termsOfUse" rows="4" defaultValue={getValue(store, 'legal.termsOfUse')} />
        </label>

        <button className="button" type="submit">Salvar configurações</button>
      </form>
    </>
  );
}
