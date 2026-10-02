import { MoveLeft } from "lucide-react";
import Category from './Category';
import '../../../css/Onbording/Art-Desing.css';

export default function ArtDesign({ onNext, onBack, category, setCategory }) {
  return (
    <div className="art-desing">
      <h2>می‌خوای کدوم حوزه‌ی هنر و طراحی رو یاد بگیری؟</h2>
      <p className="favorite-field">
        هرکدوم رو که بیشتر جذبت می‌کنه انتخاب کن.
      </p>

      <div className="categories">
        <Category
            icon='🧩'
            title='طراحی رابط و تجربه کاربری(UI | UX)'
            text='طراحی اپلیکشن و سایتی که استفاده ازش راحته'
            onClick={() => setCategory('ui-ux')}
            selected={category === 'ui-ux'}
        />

        <Category
            icon='🎨'
            title='طراحی گرافیک'
            text='پوستر، لوگو و هویت بصری'
            onClick={() => setCategory('graphic')}
            selected={category === 'graphic'}
        />

        <Category
            icon='🖌️'
            title='تصویر سازی دیجیتال'
            text='کشیدن ایده‌هات به شکل تصویر'
            onClick={() => setCategory('digital-art')}
            selected={category === 'digital-art'}
        />

        <Category
            icon='🎞️'
            title='موشن گرافیک و انیمشن'
            text='زنده کردن تصویرها با حرکت'
            onClick={() => setCategory('animation')}
            selected={category === 'animation'}
        />

        <Category
            icon='🧊'
            title='طراحی سه‌بعدی'
            text='مدل سازی و دنیاهای سه‌بعدی'
            onClick={() => setCategory('3D-design')}
            selected={category === '3D-design'}
        />

        <Category
            icon='📷'
            title='عکاسی و ادیت'
            text='عکس گرفتن، روتوش و رنگ بندی'
            onClick={() => setCategory('photography')}
            selected={category === 'photography'}
        />
      </div>
      <div className="links">
        <button className="back" onClick={onBack}>
          قبلی
        </button>
        <button className="next" onClick={onNext} disabled={!category}>
          ادامه
          <MoveLeft color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
}
