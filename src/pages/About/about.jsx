import { useTranslation } from "react-i18next";
import logo from"../../assets/logo.png"
import "./about.css"

function About() {

    const { t } = useTranslation();

    return (
        <section style={{backgroundColor: "#F2F2F2"}} className="about py-5">
            <div className="container p-2">
                <h2 className="text-center mb-4">{t("About Us")}</h2>
                <div className="row align-items-center">
                    <div className="col-12 col-md-6">
                        <div className="pe-1">
                            <img src={logo} alt="" />
                        </div>
                    </div>
                    <div className="text col-12 col-md-6">
                        <div className="ps-1">
                            <p className="mb-4">إنّ الحروفُ إذا افترقَت لاقيمة لها..</p>
                            <p className="mb-4">لكنها تخلقُ سماءً إذا اجتمَعَت؛ وتحققُ حلماً؛ وتُرضي طموحاً؛ وتروي الظمأ!</p>
                            <p className="mb-4">نحنُ الذين تقومُ بنا الأمة.. الشباب؛ قد اجتمعنا لننقل كلماتكم إلى مكانها الصحيح؛ لنرتب ما أردتم قوله ذات يوم..
                            لكنّ الفرصة لم تكُن مناسبة؛ وهنا في "كلمات" كلّ اللحظاتِ فرصٌ مناسبةٌ للقراءة؛ وفرصٌ مناسبةٌ للكتابة؛ وفرصٌ مناسبةٌ لامتلاك العالم بين دفّتَي كتاب.</p>
                            <strong>القراءة حياةٌ أخرى نعيشها...</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;