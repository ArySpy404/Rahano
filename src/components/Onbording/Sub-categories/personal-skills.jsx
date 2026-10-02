import Category from "./Category"
import '../../../css/Onbording/personal-skills.css';
import { MoveLeft } from "lucide-react";

export default function PersonalSkills ({onNext , onBack , category , setCategory}) {
    return (
        <div className="personal-skills">
            <h2>کدوم مهارت رو می‌خوای تو خودت تقویت کنی؟</h2>
            <p className="favorite-text">یه مورد رو انتخاب کن، بعداً می‌تونی بقیه رو هم اضافه کنی.</p>

            <div className="categories">
                <Category
                    icon='⏱️'
                    title='مدیریت زمان و تمرکز'
                    text='برنامه‌ریزی و استفاده‌ی بهتر از وقت'
                    onClick={() => setCategory('hour-management')}
                    selected={category === 'hour-management'}
                />

                <Category
                    icon='💬'
                    title='مهارت‌های ارتباطی'
                    text='حرف زدن، گوش دادن و ارتباط موًثر'
                    onClick={() => setCategory('social-ability')}
                    selected={category === 'social-ability'}
                />

                <Category
                    icon='🎤'
                    title='سخرانی و ارائه'
                    text='اعتماد به نفس جلوی جمع'
                    onClick={() => setCategory('speech')}
                    selected={category === 'speech'}
                />

                <Category
                    icon='💡'
                    title='تفکر و حل مسئله'
                    text='تحلیل کردن و تصمیم‌گیری بهتر'
                    onClick={() => setCategory('analysis')}
                    selected={category === 'analysis'}
                />

                <Category
                    icon='📚'
                    title='یادگیری موًثر'
                    text='روش های درست درس خوندن و یاد گرفتن'
                    onClick={() => setCategory('studying')}
                    selected={category === 'studying'}
                />

                <Category
                    icon='💰'
                    title='مدیریت مالی و شخصی'
                    text='مدیریت پول و تصمیم‌های مالی ساده'
                    onClick={() => setCategory('financial')}
                    selected={category === 'financial'}
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
    )
}