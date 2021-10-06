import {Toaster} from "react-hot-toast";
import {Sidebar} from "../../components/Sidebar";
import {Input} from "../../components/Input";


export default  function AnnouncementAddress() {
    return (
        <div>
            <Toaster />
            <Sidebar />

            <div>
                <section>
                    <h2>Localização do imóvel</h2>
                    <form>
                        <fieldset>
                            <Input name={"state"} label={"Estado"} />
                            <Input name={"city"} label={"Cidade"} />
                        </fieldset>

                    </form>
                </section>
            </div>
        </div>
    );
}