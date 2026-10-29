import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

let fixture;
export async function exercise(extension, {wait, expect}) {
    const indicators = Main.panel.statusArea.quickSettings._indicators;
    expect(extension._powerIcon?.visible, 'The power icon was not created and shown');
    expect(extension._powerIcon.get_parent() === indicators, 'The power icon is detached from Quick Settings');
    fixture?.destroy();
    fixture = new St.Icon({icon_name: 'audio-volume-high-symbolic', visible: true});
    indicators.add_child(fixture);
    await wait(100);
    expect(!fixture.visible, 'A newly added status icon remained visible');
    fixture.show();
    await wait(100);
    expect(!fixture.visible, 'A status icon could unhide itself while the extension was active');
}

export async function disabled({expect}) {
    expect(fixture.visible, 'Disabling did not restore the original indicator visibility');
    fixture.destroy();
    fixture = null;
}
